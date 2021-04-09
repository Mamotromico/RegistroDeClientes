# Descrição

Esse projeto é um CRUD simples feito com Laravel 8 e React.js

# Configuração

## É Necessario que se tenha o Docker instalado no sistema, seja ele Linux ou Windows usando WSL2. O uso em MacOS não deve divergir tanto mas não tenho como testar no momento.

Primeiro clone o projeto:

```
git clone https://github.com/Mamotromico/RegistroDeClientes.git
```

```
cd RegistroDeClientes
```

Copie o arquivo .env.example fornecido e adicione informações aos seguintes campos:

- DEFAULT_USER_NAME
- DEFAULT_USER_EMAIL
- DEFAULT_USER_PASSWORD

```
cp .env.example .env
```
Após isso indicaremos ao docker que inicie nosso ambiente de desenvolvimento e instale as dependencias php necessárias:

```
docker run --rm -u "$(id -u):$(id -g)" -v $(pwd):/opt -w /opt laravelsail/php80-composer:latest composer install --ignore-platform-reqs
```

Suba a imagem com:

```
./vendor/bin/sail up
```

Após, produza a chave de projeto Laravel:

```
./vendor/bin/sail artisan key:generate
```

Rode as migrações necessárias, populando o banco de dados:

```
./vendor/bin/sail artisan migrate --seed
```

Instale todas as dependências node:

```
./vendor/bin/sail npm install
```

Compile e publique o frontend:

```
./vendor/bin/sail npm run dev
```

Depois disso tudo é só ir para seu localhost e logar com o usuário padrão definido no seu arquivo .env
