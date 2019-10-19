/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('agendamento', {
		cd_agenda: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		dt_agenda: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		hr_inicio: {
			type: DataTypes.DATE,
			allowNull: false
		},
		hr_fim: {
			type: DataTypes.DATE,
			allowNull: false
		},
		vl_push_notificacao: {
			type: DataTypes.CHAR(1),
			allowNull: false
		},
		cd_credenciado: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
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
		}
	}, {
		tableName: 'agendamento'
	});
	return Agendamento;
};
