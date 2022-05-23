export const QueryAcualBatch = `SELECT xs.*, (IFNULL(xs.ttime, 0) + IFNULL(xs.forming_total, 0)+ IFNULL(xs.oven_backing,0)) AS batch_time
FROM 
(
	SELECT a.batch_regis_id, b.product_id, d.product_name, a.batch_regis_qty, a.batch_regis_start_time, 
	a.batch_regis_end_time, a.batch_regis_transfer_time, TIME_TO_SEC(
	TIMEDIFF(a.batch_regis_end_time, a.batch_regis_start_time))/60 ttime, a.batch_regis_prod_flag, 
	e.transfer_flagh,  e.header_id mix_header_id, h.header_shift mix_shift,
	f.forming_prod_id, f.forming_start, f.forming_finish, TIME_TO_SEC(f.forming_total)/60 forming_total,
	g.oven_prod_id, g.oven_prod_batch_id,  CAST(i.standar_form_value AS UNSIGNED) oven_backing, f.batch_capacity_time target_time, xl.downtime  
	FROM frml_batch_regis a 
	LEFT JOIN product_plan b ON a.product_plan_id = b.product_plan_id
	LEFT JOIN product_batch c ON a.batch_id = c.batch_id
	LEFT JOIN product d ON d.product_id = b.product_id
	LEFT JOIN product_batch_capacity f ON b.product_id = f.product_id
	LEFT JOIN  mixer_proc_chek e ON a.batch_regis_id = e.batch_regis_id
	LEFT JOIN(
		SELECT m.forming_prod_id, m.batch_regis_id, m.standar_form_value forming_start, n.standar_form_value forming_finish, o.standar_form_value forming_total 
	FROM  forming_prod_check_detail m 
	LEFT JOIN forming_prod_check_detail n 
		ON m.forming_prod_id = n.forming_prod_id AND m.batch_regis_id = n.batch_regis_id
		AND n.standar_form_id = 51
	LEFT JOIN forming_prod_check_detail o 
		ON m.forming_prod_id = o.forming_prod_id AND m.batch_regis_id = o.batch_regis_id
		AND o.standar_form_id = 69
	LEFT JOIN forming_prod v ON m.forming_prod_id = v.forming_prod_id
	WHERE m.standar_form_id = 50 AND v.forming_prod_date = :date
	) f ON a.batch_regis_id = f.batch_regis_id
	LEFT JOIN oven_prod_batch g ON a.batch_regis_id = g.batch_regist_id
	LEFT JOIN oven_prod_check_detail i ON i.batch_regis_id = g.batch_regist_id AND i.standar_form_id = 52
	LEFT JOIN list_header_form h ON e.header_id = h.header_id
	LEFT JOIN (
		SELECT l.product_id, l.batch_regis_id, sum(TIME_TO_SEC(l.tot_downtime)/60) downtime
		  FROM prod_downtime_view l
		WHERE date(l.downtime_start) = :date
		GROUP BY l.product_id, l.batch_regis_id
	)xl ON a.batch_regis_id = xl.batch_regis_id
	WHERE a.batch_regis_transfer_flag = 'Y' AND b.product_plan_date = :date AND c.weight_comp_id = 1
)xs
`;

export const QueryGetChart = `SELECT a.prod_package_date, a.prod_package_shift,  a.product_id, b.product_name, a.package_id, a.prod_hour, 
CONCAT(
case when LENGTH(a.prod_hour) = 1 THEN CONCAT('0', a.prod_hour) ELSE a.prod_hour END,
':','00'
) title_hour,
a.prod_qty,
a.prod_qty -
IFNULL((
    SELECT max(prod_qty) FROM prod_package_scount_view sa 
    WHERE sa.prod_package_date = a.prod_package_date and
    sa.product_id = a.product_id and
    sa.package_id = a.package_id and
    sa.prod_hour < a.prod_hour and
    sa.prod_package_shift = a.prod_package_shift
),0) prod_qty_b 
FROM prod_package_scount_view a
LEFT JOIN product b ON a.product_id = b.product_id
WHERE a.prod_package_date = :date AND a.prod_package_flag = :flag
AND a.package_id = 4 ORDER BY a.product_id, a.prod_package_shift, a.prod_hour`;

export const QueryGetDistOutProd = `SELECT 'PROD' prod_flag, product_id, package_id, product_name, SUM(prod_qty) totprod FROM (
	SELECT a.prod_package_shift, a.product_id, b.product_name, a.package_id, MAX(prod_qty) prod_qty  
	FROM prod_package_scount_view a
	LEFT JOIN product b ON b.product_id = a.product_id
	WHERE a.prod_package_date =  :date AND a.prod_package_flag= :flag
	GROUP BY a.prod_package_shift, a.product_id, a.package_id
	) a GROUP BY a.product_id, a.package_id;
	
				   `;

export const QueryPlanProdFg = `SELECT *, 
left(frml1, (LENGTH(frml1) - LENGTH((SUBSTRING_INDEX(frml1,'*', -1))) -1)) 
as endFrml
FROM (
SELECT a.*, d.product_id, d.product_name, c.batch_base_package_unit,
	   SUBSTRING_INDEX( SUBSTRING(a.product_plan_batch_formula,3, LENGTH(a.product_plan_batch_formula)- 8), '/', 1) AS frml1, 
	   nn.totprod AS actual_FG, nm.actual_batch
FROM product_plan_batch a 
LEFT JOIN product_plan b ON a.product_plan_id = b.product_plan_id
LEFT JOIN product_batch c ON a.batch_id = c.batch_id 
LEFT JOIN product d ON d.product_id = b.product_id
LEFT JOIN (
   SELECT 'PROD' prod_flag, product_id, package_id, SUM(prod_qty) totprod FROM (
	   SELECT a.prod_package_shift, a.product_id, a.package_id, MAX(prod_qty) prod_qty  
	   FROM prod_package_scount_view a
	   WHERE a.prod_package_date =  :date AND a.prod_package_flag='PRODUCTION'
	   GROUP BY a.prod_package_shift, a.product_id, a.package_id
	   ) a GROUP BY a.product_id, a.package_id
   )nn ON b.product_id = nn.product_id
LEFT JOIN (
   SELECT COUNT(*) actual_batch, b.product_id 
   FROM frml_batch_regis a 
   LEFT JOIN product_plan b ON a.product_plan_id = b.product_plan_id
   LEFT JOIN product_batch c ON a.batch_id = c.batch_id
   WHERE a.batch_regis_transfer_flag = 'Y' 
   AND a.batch_regis_prod_flag = 'Y'
   AND b.product_plan_date = :date
   AND c.weight_comp_id = 1
   GROUP BY b.product_id 
) nm ON b.product_id = nm.product_id
WHERE b.product_plan_date = :date AND c.weight_comp_id = 1
) SG`;

//query get Dash Reject biskuit

export const QueryGetRejectKeping = `SELECT a.* FROM prod_reject_biskuit a WHERE a.prod_package_date = :date`;
export const QueryGetRejectDough = `SELECT a.* FROM prod_reject_dough a WHERE a.product_plan_date = :date`;
