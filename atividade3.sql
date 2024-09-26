create table tb_usuario (
	usu_id int not null primary key auto_increment,
    usu_email varchar(100),
    usu_senha varchar(200),
    usu_nome varchar(100),
    usu_datacadastro datetime
);

create table tb_categoria (
	cat_id int not null primary key auto_increment,
    cat_descricao varchar(200)
);

create table tb_conteudo (
	con_id int not null primary key auto_increment,
    con_youtubeid varchar(200),
    con_titulo varchar(200),
    con_disponivel varchar(1),
    cat_id int,
    
    foreign key (cat_id) references tb_categoria (cat_id)  
);

insert into tb_categoria (cat_descricao) values ('Tecnologia');
insert into tb_categoria (cat_descricao) values ('Notícias');
insert into tb_categoria (cat_descricao) values ('Esportes');

insert into tb_conteudo (con_youtubeid, con_titulo, con_disponivel, cat_id) values
('GDlkCkcIqTs', 'Apresentação do novo iPhone 16', 'S', 1)
    

