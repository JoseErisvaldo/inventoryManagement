/*
-- Tabela de Produtos
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    stock INT NOT NULL DEFAULT 0, -- Estoque inicial
    price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Vendas
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Itens Vendidos
CREATE TABLE sales_items (
    id SERIAL PRIMARY KEY,
    sale_id INT REFERENCES sales (id) ON DELETE CASCADE,
    product_id INT REFERENCES products (id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Function para atualizar o estoque
CREATE OR REPLACE FUNCTION update_stock_after_sale()
RETURNS TRIGGER AS $$
BEGIN
    -- Atualiza o estoque do produto, reduzindo a quantidade vendida
    UPDATE products
    SET stock = stock - NEW.quantity
    WHERE id = NEW.product_id;

    -- Verifica se o estoque ficou negativo
    IF (SELECT stock FROM products WHERE id = NEW.product_id) < 0 THEN
        RAISE EXCEPTION 'Stock cannot be negative for product ID %', NEW.product_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para chamar a function ao inserir um novo item de venda
CREATE TRIGGER trigger_update_stock
AFTER INSERT ON sales_items
FOR EACH ROW
EXECUTE FUNCTION update_stock_after_sale();


*/

/*----------------------------------------------*/

/*
INSERT INTO products (name, stock, price) VALUES ('Product A', 100, 19.99);
INSERT INTO sales (customer_name, total_price) VALUES ('José', 12.30);
INSERT INTO sales_items (sale_id, product_id, quantity) VALUES (2, 2, 3);


*/ 


/*----------------------------------------------*/


/*
-- Tabela de Agendamentos
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products (id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP DEFAULT NOW()
);

*/


/*----------------------------------------------*/


/*
CREATE OR REPLACE FUNCTION increase_stock_after_appointment()
RETURNS TRIGGER AS $$
BEGIN
    -- Aumentar o estoque do produto
    UPDATE products
    SET stock = stock + NEW.quantity
    WHERE id = NEW.product_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

*/

/*----------------------------------------------*/


/*
CREATE TRIGGER trigger_increase_stock
AFTER INSERT ON appointments
FOR EACH ROW
EXECUTE FUNCTION increase_stock_after_appointment();

*/

/*

-- Agendamento para devolver 2 unidades do Product A
INSERT INTO appointments (product_id, quantity) 
VALUES 
(2, 5); -- Aumenta o estoque do Product A em 2

*/

/*----------------------------------------------*/

/*

create table public.users (
  id serial primary key,
  name varchar(255) not null,
  email varchar(255) not null unique,
  created_at timestamp default now()
);

insert into public.users (name, email)
values 
  ('João Silva', 'joao.silva@example.com'),
  ('Maria Oliveira', 'maria.oliveira@example.com'),
  ('Carlos Souza', 'carlos.souza@example.com'),
  ('Ana Costa', 'ana.costa@example.com'),
  ('Lucas Lima', 'lucas.lima@example.com');

*/