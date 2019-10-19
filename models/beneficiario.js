/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('beneficiario', {
		nr_matricula: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nm_beneficiario: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		nr_cpf: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		dt_nascimento: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		sn_ativo: {
			type: DataTypes.CHAR(1),
			allowNull: false
		},
		sexo: {
			type: DataTypes.CHAR(1),
			allowNull: false
		},
		ds_email: {
			type: DataTypes.STRING(80),
			allowNull: false
		},
		tp_logradouro: {
			type: DataTypes.STRING(10),
			allowNull: false
		},
		ds_endereco: {
			type: DataTypes.STRING(70),
			allowNull: false
		},
		nr_endereco: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		ds_bairro: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		ds_cidade: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		cd_uf: {
			type: DataTypes.STRING(2),
			allowNull: false
		},
		nr_cep: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		}
	}, {
		tableName: 'beneficiario'
	});
};
