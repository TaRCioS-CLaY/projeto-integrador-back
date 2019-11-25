# Projeto Integrador - 2019.2 - UNICARIOCA
### Instruções para rodar o projeto
1. Clone este repositório
2. Execute ``yarn install`` dentro da pasta clonada e aguarde a instalação das dependências
3. Execute ``yarn start`` para levantar o servidor
4. Abra o navegador e acesse http://localhost:3000


## Endpoints

### Beneficiários
###### `/beneficiarios`
Busca todos os beneficiários.
#### Exemplo de retorno
```javascript
[
  {
    "nr_matricula": 1,
    "nm_beneficiario": "Emilly Lara Porto"
  },
  {
    "nr_matricula": 2,
    "nm_beneficiario": "Augusto Yuri Rodrigues"
  },
  {
    "nr_matricula": 3,
    "nm_beneficiario": "Jennifer Regina Costa"
  }
]

```

### Demonstrativo de Despesas
###### `/despesas`
Busca todas as despesas
#### Exemplo de retorno
```javascript
[
  {
    "dt_atendimento": "2019-10-18",
    "ds_credenciado": "Renato Vinicius Fernandes",
    "ds_procedimento": "Consulta clinica geral",
    "vl_procedimento": 50
  },
  {
    "dt_atendimento": "2019-10-20",
    "ds_credenciado": "Luna Betina Ribeiro",
    "ds_procedimento": "Limpeza",
    "vl_procedimento": 50
  }
]

```

###### `/despesas?id=`
Busca as despesas apenas do Id informado como parametro
#### Exemplo de retorno
```javascript
[
  {
    "dt_atendimento": "2019-10-20",
    "ds_credenciado": "Luna Betina Ribeiro",
    "ds_procedimento": "Limpeza",
    "vl_procedimento": 50
  }
]

```


## Comandos úteis 
##### Instalar dependências do projeto
```
yarn install
```

##### Hot-reloads para desenvolvimento
```
yarn start
```

##### Compilar e minificar para produção
```
yarn build
```

##### Procurar por erros nos arquivos
```
yarn lint
```
