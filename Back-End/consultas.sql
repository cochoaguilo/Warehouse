ALTER table compania 
add foreign key (id_ciudad) references ciudades(id_ciudad)

insert into compania (nombre,direccion,correo,telefono,id_ciudad)
values ('Google', 'Santa Maria 666', 'google@gmail,com', '44454422', 1)

insert into contactos (nombre, id_compania, Cargo, id_canal, id_interes, id_ciudad, apellido,
correo, direccion, cuenta_usuario, id_preferencias)
VALUES('Marcos', 1,'Vice-Presidente Junior', 2, 2, 1, 'Aguilo', 'eljunior@gmail.com', 'Santa Fe 198', 'cochoaguilo',3)

insert into canal_Contacto (canal)
values ('Telefono')

select r2.nombre nombre_region, p.nombre nombre_pais, c3.nombre nombre_ciudad,c.nombre nombre_contacto, c2.nombre nombre_compania
FROM contactos c 
left join ciudades c3 using(id_ciudad)
left join paises p using(id_pais)
left join regiones r2 using(id_region)
left join compania c2 using(id_compania)

select * from ciudades c 
left join paises p using(id_pais)
left join regiones r2 using(id_region)
WHERE id_ciudad = 1