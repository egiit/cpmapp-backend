import { DataTypes } from 'sequelize';
import db from '../config/database.js';

// import { DataTypes } from 'Sequelize';

//update or Create User Access
export const UserAcc = db.define(
  //module user axces
  'xref_user_acess_web',
  {
    USER_ID: { type: DataTypes.BIGINT(20) },
    MENU_ID: { type: DataTypes.BIGINT(20) },
    USER_ACESS_VIEW: { type: DataTypes.INTEGER },
    USER_ACESS_ADD: { type: DataTypes.INTEGER },
    USER_ACESS_MOD: { type: DataTypes.INTEGER },
    USER_ACESS_DELETE: { type: DataTypes.INTEGER },
    USER_ACESS_SAVE: { type: DataTypes.INTEGER },
    USER_ACESS_PRINT: { type: DataTypes.INTEGER },
    USER_ACESS_IMPORT: { type: DataTypes.INTEGER },
    USER_ACESS_EXPORT: { type: DataTypes.INTEGER },
    USER_ACESS_ADD_DATE: { type: DataTypes.DATE },
    USER_ACESS_ADD_ID: { type: DataTypes.BIGINT(20) },
    USER_ACESS_MOD_DATE: { type: DataTypes.DATE },
    USER_ACESS_MOD_ID: { type: DataTypes.BIGINT(20) },
  },
  {
    freezeTableName: true,
    createdAt: 'USER_ACESS_ADD_DATE',
    updatedAt: 'USER_ACESS_MOD_DATE',
  }
);

UserAcc.removeAttribute('id');

//query role Access
export const MenuAccessRole = `SELECT 
a.MENU_ID, 
a.MENU_CONTROL_ID, 
a.MENU_NAME, 
a.MENU_ACT_VIW, 
a.MENU_ACT_ADD, 
a.MENU_ACT_MOD, 
a.MENU_ACT_DEL, 
a.MENU_ACT_SAV, 
a.MENU_ACT_PRN,
b.USER_ACESS_VIEW,
b.USER_ACESS_ADD,
b.USER_ACESS_MOD,
b.USER_ACESS_DELETE,
b.USER_ACESS_PRINT  FROM xref_menu_web a
LEFT JOIN xref_user_acess_web b ON a.MENU_ID = b.MENU_ID AND b.USER_ID = :id ORDER BY a.MENU_ID`;

export const QueryMenuView = `SELECT 
a.MENU_ID, 
a.MENU_CONTROL_ID, 
a.MENU_GROUP,
a.MENU_GROUP_SUB,
a.MENU_KEY,
a.MENU_NAME, 
a.MENU_PATH,
a.MENU_FORM,
a.MENU_ACT_VIW, 
a.MENU_ACT_ADD, 
a.MENU_ACT_MOD, 
a.MENU_ACT_DEL, 
a.MENU_ACT_SAV, 
a.MENU_ACT_PRN,
b.USER_ACESS_VIEW,
b.USER_ACESS_ADD,
b.USER_ACESS_MOD,
b.USER_ACESS_DELETE,
b.USER_ACESS_PRINT  FROM xref_menu_web a
LEFT JOIN xref_user_acess_web b ON a.MENU_ID = b.MENU_ID 
WHERE b.USER_ID = :id AND b.USER_ACESS_VIEW = 1 
ORDER BY a.MENU_CONTROL_ID, a.MENU_KEY`;
