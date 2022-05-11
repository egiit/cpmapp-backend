import db from '../../config/database.js';
import { QueryTypes } from 'sequelize';
import {
  DowntimeModel,
  QueryAllDowntime,
  QueryRepDowntime,
} from '../../models/downtimes.model.js';

// function get list downtime Per Dept per Header
export const getDowntime = async (req, res) => {
  try {
    const dataDowntime = await DowntimeModel.findAll({
      where: {
        header_id: req.params.headerId,
      },
    });
    res.json(dataDowntime);
  } catch (error) {
    res.json({ massage: error.message });
  }
};

//get All downtime List
export const getAllDowntime = async (req, res) => {
  try {
    const dataDowntime = await db.query(QueryAllDowntime, {
      replacements: {
        date: req.params.date,
      },
      type: QueryTypes.SELECT,
    });
    res.json(dataDowntime);
  } catch (error) {
    res.json({ massage: error.message });
  }
};

//get downtime for report dept
export const getDowntimeReport = async (req, res) => {
  try {
    const dataDowntime = await db.query(QueryRepDowntime, {
      replacements: {
        deptId: req.params.deptId,
        date: req.params.date,
      },
      type: QueryTypes.SELECT,
    });
    res.json(dataDowntime);
  } catch (error) {
    res.json({ massage: error.message });
  }
};

// function create update get list downtime
export const postDowntime = async (req, res) => {
  try {
    const dataD = req.body;

    const findItem = await DowntimeModel.findOne({
      where: {
        downtime_id: dataD.downtime_id,
      },
    });

    if (!findItem) {
      await DowntimeModel.create(dataD);
      return res.json({ message: 'Down Time Telah ditambahkan' });
    }

    await DowntimeModel.update(dataD, {
      where: { downtime_id: dataD.downtime_id },
    });

    return res.json({ message: 'Down Time Telah Update' });
  } catch (error) {
    res.json({ massage: error.message });
  }
};

//delete downtime
export const deleteDowntime = async (req, res) => {
  try {
    await DowntimeModel.destroy({ where: { downtime_id: req.params.id } });
    res.json({ message: 'Data Downtime di Hapus!' });
  } catch (error) {
    res.json({ message: error.message });
  }
};
