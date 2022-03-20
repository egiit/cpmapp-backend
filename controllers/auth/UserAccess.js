import { QueryTypes } from 'sequelize';

import db from '../../config/database.js';
import {
  UserAcc,
  MenuAccessRole,
  QueryMenuView,
} from '../../models/userAcces.js';

// import { QueryTypes } from 'Sequelize'; //model user

//menuRole
export const getUserAcces = async (req, res) => {
  const userAcces = await db.query(MenuAccessRole, {
    replacements: { id: req.params.id },
    type: QueryTypes.SELECT,
  });
  res.json(userAcces);
};

//Update User Access
export const updateOrCreateUserAccess = async (req, res) => {
  const foundItem = await UserAcc.findOne({
    where: {
      USER_ID: req.params.id,
      MENU_ID: req.params.menuid,
    },
  });

  if (!foundItem) {
    const item = await UserAcc.create(req.body);
    return res.json({
      item: item,
      message: 'User Access Added',
    });
  }

  const item = await UserAcc.update(req.body, {
    where: {
      USER_ID: req.params.id,
      MENU_ID: req.params.menuid,
    },
  });

  return res.json({
    item: item,
    message: 'User Access Update',
  });
};

//
//menu Access View
export const getViewAccess = async (req, res) => {
  const menuViewAccess = await db.query(QueryMenuView, {
    replacements: { id: req.params.id },
    type: QueryTypes.SELECT,
  });
  if (menuViewAccess.length === 0)
    return res
      .status(400)
      .json({ message: 'Anda Belum Mendapatkan Aksess Apapun' });
  res.json(menuViewAccess);
};
