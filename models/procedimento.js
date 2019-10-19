/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('procedimento', {
		cd_procedimento: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		ds_procedimento: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		vl_procedimento: {
			type: DataTypes.FLOAT,
			allowNull: false
		}
	}, {
		tableName: 'procedimento'
	});
};
