/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('atendimento', {
		cd_atendimento: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		cd_agenda: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'agendamento',
				key: 'cd_agenda'
			}
		},
		dt_atendimento: {
			type: DataTypes.DATE,
			allowNull: false
		},
		hr_inicio: {
			type: DataTypes.DATE,
			allowNull: true
		},
		hr_fim: {
			type: DataTypes.DATE,
			allowNull: true
		},
		sn_realizado: {
			type: DataTypes.CHAR(1),
			allowNull: false
		},
		cd_credenciado: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'credenciado',
				key: 'cd_credenciado'
			}
		},
		nr_matricula: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'beneficiario',
				key: 'nr_matricula'
			}
		},
		cd_especialidade: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'especialidade',
				key: 'cd_especialidade'
			}
		},
		cd_procedimento: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'procedimento',
				key: 'cd_procedimento'
			}
		}
	}, {
		tableName: 'atendimento'
	});
};
