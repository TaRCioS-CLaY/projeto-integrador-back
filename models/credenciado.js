/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('credenciado', {
		cd_credenciado: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		ds_credenciado: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		tp_credenciado: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		crm: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		ds_endereco: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		nr_cep: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		nr_cpf_cnpj: {
			type: DataTypes.STRING(18),
			allowNull: false
		},
		nr_celular: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		nr_telefone: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		ds_email: {
			type: DataTypes.STRING(80),
			allowNull: false
		},
		cd_especialidade: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'especialidade',
				key: 'cd_especialidade'
			}
		}
	}, {
		tableName: 'credenciado'
	});
};
