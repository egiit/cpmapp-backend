import { QueryTypes } from 'sequelize';
import { Parser } from 'expr-eval';
const parser = new Parser();

import db from '../config/database.js';
import {
  QueryAcualBatch,
  QueryGetChart,
  QueryGetDistOutProd,
  QueryGetRejectDough,
  QueryGetRejectDoughBatch,
  QueryGetRejectKeping,
  QueryPlanProdFg,
} from '../models/dashboard.model.js';

//control GetActual Batch
export const getDashActualBatch = async (req, res) => {
  try {
    const allData = await db.query(QueryAcualBatch, {
      replacements: {
        date: req.params.date,
      },
      type: QueryTypes.SELECT,
    });

    const btchData = allData.filter(
      (data) => data.batch_regis_transfer_time !== null
    );

    const totActualBatch = btchData
      .map((item) => item.batch_regis_qty)
      .reduce((prev, curr) => prev + curr, 0);

    res.json({ actual: btchData, all: allData, totActualBatch });
  } catch (error) {
    res.json({ message: 'Data Tidak Ditemukan', error });
  }
};

//control Data Chart Finish Goood
export const getDashDataChart = async (req, res) => {
  try {
    //async get data Distincng product
    await db
      .query(QueryGetDistOutProd, {
        replacements: {
          date: req.params.date,
          flag: req.params.flag,
        },
        type: QueryTypes.SELECT,
      })
      .then((dataprodD) => {
        db.query(QueryGetChart, {
          //async get Data Chart output perBatch
          replacements: {
            date: req.params.date,
            flag: req.params.flag,
          },
          type: QueryTypes.SELECT,
        })
          .then((details) => {
            const distArrHour = [...new Set(details.map((x) => x.prod_hour))]; //disting hournya
            const distTitleHour = [
              ...new Set(details.map((x) => x.title_hour)),
            ]; //disting hournya
            const sumFg = details
              .map((item) => item.prod_qty_b)
              .reduce((prev, curr) => prev + curr, 0); //cari total Actual Output FG

            let arrayForChart = []; //buat array kosong untuk combine product dan output per hour per product

            dataprodD.map((prods) => {
              //looping data product
              const datChart = {
                //buat object data chart
                id: prods.product_id, //data dari get product
                name: prods.product_name,
                data: [], //array kosong untuk hasil looping per hour dan batch
              };

              distArrHour.forEach((fg) => {
                //looping hour
                const indx = details.findIndex(
                  //cari index data berdasarkan id product dan hour
                  (valFg) =>
                    valFg.product_id === prods.product_id &&
                    valFg.prod_hour === fg
                );

                if (indx < 0) return datChart.data.push(null); //jika index tidak ada return null dan masukan array

                datChart.data.push(details[indx].prod_qty_b); // jika ada masukan ke array
              });

              arrayForChart.push(datChart); //push ke object chart
            });
            res.json({
              series: arrayForChart,
              categories: distTitleHour,
              totalFG: sumFg,
            });
          })
          .catch((err) => console.log(err));
      });
  } catch (error) {
    res.json({ message: 'Data Tidak Ditemukan', error });
  }
};

//control GetPlanFG
export const getPlanFg = async (req, res) => {
  try {
    const planFg = await db.query(QueryPlanProdFg, {
      replacements: {
        date: req.params.date,
      },
      type: QueryTypes.SELECT,
    });
    const dataTarget = [];
    planFg.map((pln) => {
      const targetFg = {
        ...pln,
        target:
          (Parser.evaluate(pln.product_plan_chip_formula) *
            pln.product_plan_batch_publish_qty) /
          Parser.evaluate(pln.endFrml),
      };
      dataTarget.push(targetFg);
    });

    const planTarget = dataTarget
      .map((item) => item.target)
      .reduce((prev, curr) => prev + curr, 0)
      .toFixed(1);

    const planBatch = dataTarget
      .map((item) => item.product_plan_batch_publish_qty)
      .reduce((prev, curr) => prev + curr, 0)
      .toFixed(1);

    res.json({ dataTarget, planTarget, planBatch });
  } catch (error) {
    res.json({ message: 'Data Planing FG Tidak Ditemukan', error });
  }
};

//control Chart Batch
export const getChartBatch = async (req, res) => {
  try {
    const allData = await db.query(QueryAcualBatch, {
      replacements: {
        date: req.params.date,
      },
      type: QueryTypes.SELECT,
    });

    const dataSeries = [];

    allData
      .filter(
        (data) =>
          data.batch_regis_transfer_time !== null && data.oven_backing !== null
      )
      .map((btch, i) => {
        const datBatch = {
          x: `Batch ${i + 1}`,
          y: btch.batch_time,
          goals: [
            {
              name: 'Target Time',
              value: btch.target_time,
              strokeHeight: 5,
              strokeColor: '#E0000B',
            },
          ],
        };

        dataSeries.push(datBatch);
      });

    res.json(dataSeries);
  } catch (error) {
    res.json({ message: 'Data Tidak Ditemukan', error });
  }
};

//control Product FG Rework
export const getProdFG = async (req, res) => {
  try {
    const prodFG = await db.query(QueryGetDistOutProd, {
      replacements: {
        date: req.params.date,
        flag: req.params.flag,
      },
      type: QueryTypes.SELECT,
    });

    res.json(prodFG);
  } catch (error) {
    res.json({ message: 'Data Tidak Rework Ditemukan', error });
  }
};

//get total reject dough Keping, dan total Reject global
export const getRejectTotal = async (req, res) => {
  try {
    const dataKeping = await db.query(QueryGetRejectKeping, {
      replacements: {
        date: req.params.date,
      },
      type: QueryTypes.SELECT,
    });

    const dataDough = await db.query(QueryGetRejectDough, {
      replacements: {
        date: req.params.date,
      },
      type: QueryTypes.SELECT,
    });

    const totRejectKeping = dataKeping
      .map((item) => item.prod_reject_qty)
      .reduce((prev, curr) => prev + curr, 0);
    const totRejectDough = dataDough
      .map((item) => item.batch_comp_valuea)
      .reduce((prev, curr) => prev + curr, 0);
    const totalReject = totRejectDough + totRejectKeping;

    res.json({
      dataDough,
      dataKeping,
      rejectKeping: totRejectKeping,
      rejectDough: totRejectDough,
      totalReject: totalReject,
    });
  } catch (error) {
    res.json({ message: 'Data Reject Ditemukan', error });
  }
};

//get reject dough Per Batch Per Dept
export const getRejectPerBatch = async (req, res) => {
  try {
    const dataReBatch = await db.query(QueryGetRejectDoughBatch, {
      replacements: {
        date: req.params.date,
      },
      type: QueryTypes.SELECT,
    });

    res.json(dataReBatch);
  } catch (error) {
    res.json({ message: 'Data Reject Ditemukan', error });
  }
};
