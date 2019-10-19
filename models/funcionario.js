/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('funcionario', {
		cd_usuario: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nm_usuario: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		nr_cpf: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		ds_setor: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		ds_cargo: {
			type: DataTypes.STRING(50),
			allowNull: false
		}
	}, {
		tableName: 'funcionario'
	});
};
