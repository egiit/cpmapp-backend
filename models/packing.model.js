export const QureryGetPackingProd = `SELECT na.prod_package_date, na.product_id, e.product_name , na.package_id, na.shift1, na.shift2, na.shift3,
(IFNULL(na.shift1,0)+IFNULL(na.shift2,0)+IFNULL(na.shift3,0)) total
FROM (
	SELECT a.prod_package_date,  a.product_id, a.package_id,  
	sum(shift1_qty) shift1, sum(shift2_qty) shift2, sum(shift3_qty) shift3
	FROM (
	 SELECT  a.prod_package_date,  a.product_id, a.package_id, 
		CASE WHEN a.prod_package_shift = 1 THEN prod_qty END shift1_qty,
		CASE WHEN a.prod_package_shift = 2 THEN prod_qty END shift2_qty,
		CASE WHEN a.prod_package_shift = 3 THEN prod_qty END shift3_qty
	  	FROM (
			SELECT  a.prod_package_date, a.prod_package_shift, a.product_id, a.package_id, MAX(prod_qty) prod_qty  
			FROM prod_package_scount_view a
			LEFT JOIN product_batch b ON a.product_id = b.product_id
			LEFT JOIN product_batch_package c ON b.batch_id = c.batch_id
			WHERE a.prod_package_date =  :date AND a.prod_package_flag=:flag  AND c.batch_package_target_flag = 1
			GROUP BY a.prod_package_shift, a.product_id, a.package_id
		) a
	)a 
	GROUP BY a.prod_package_date,  a.product_id, a.package_id
)na
LEFT JOIN product e ON e.product_id = na.product_id`;

export const QueryGetPackingHold = `SELECT da.product_id, c.product_name, da.package_desc, da.package_id, da.shift1, da.shift2, da.shift3, 
(IFNULL(da.shift1,0)+IFNULL(da.shift2,0)+IFNULL(da.shift3,0)) total
FROM 
	(
		SELECT na.product_id, na.package_desc, na.package_id,
		sum(shift1) shift1, sum(shift2) shift2, sum(shift3) shift3
		FROM (
			SELECT  sa.product_id, sa.package_desc, sa.package_id,
				CASE WHEN sa.prod_package_shift = 1 THEN prod_package_qty END shift1,
				CASE WHEN sa.prod_package_shift = 2 THEN prod_package_qty END shift2,
				CASE WHEN sa.prod_package_shift = 3 THEN prod_package_qty END shift3
			FROM (
				SELECT a.prod_package_date, a.product_id, b.package_desc, a.package_id,  a.prod_package_flag,
				a.prod_package_shift, a.prod_package_qty, a.prod_package_qty_weight
			 	FROM prod_package_scounth a
				LEFT JOIN list_package b ON  b.package_id = a.package_id
				WHERE DATE(a. prod_package_date) = :date 
			) sa
		) na
		GROUP BY na.product_id, na.package_desc, na.package_id
	)da
LEFT JOIN product c ON c.product_id = da.product_id`;

export const QueryGetPackingReject = `SELECT na.prod_package_date, na.product_id, e.product_name , na.shift1, na.shift2, na.shift3,
(IFNULL(na.shift1,0)+IFNULL(na.shift2,0)+IFNULL(na.shift3,0)) total
	FROM (
		SELECT a.prod_package_date,  a.product_id, 
		sum(shift1_qty) shift1, sum(shift2_qty) shift2, sum(shift3_qty) shift3
		FROM (
			 SELECT  a.prod_package_date,  a.product_id,
				CASE WHEN a.prod_package_shift = 1 THEN prod_package_qty END shift1_qty,
				CASE WHEN a.prod_package_shift = 2 THEN prod_package_qty END shift2_qty,
				CASE WHEN a.prod_package_shift = 3 THEN prod_package_qty END shift3_qty
			  	FROM (
					SELECT  date(a.prod_package_date) prod_package_date, a.prod_package_shift, a.product_id, sum(prod_package_qty) prod_package_qty  
					FROM prod_package_scountr a
					WHERE date(a.prod_package_date) = :date AND a.prod_package_flag= :flag
					GROUP BY date(a.prod_package_date), a.prod_package_shift, a.product_id
				)a
			)a
		GROUP BY a.prod_package_date,  a.product_id
	)na
LEFT JOIN product e ON e.product_id = na.product_id`;
