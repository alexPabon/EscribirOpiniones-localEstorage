# LocalEstorage

Dentro de las novedades que presenta HTML5 hay que destacar el localStorage. Como su propio nombre indica, se trata de un espacio de almacenamiento local.
Puede resultar similar a las cookies, que ya permitían almacenar cierta información en el lado del cliente, pero presenta una serie de diferencias que lo hacen más interesante para usos intensivos de almacenamiento de datos.
Hay que considerar que localStorage no viene a sustituir a las cookies, si no que más bien viene a ofrecer una funcionalidad complementaria que hasta ahora, por falta de alternativas, intentábamos cubrir con un uso poco estricto de las cookies.
Cookies y localStorage tienen objetivos distintos aunque en ciertos casos no este claro cuando utilizar una u otra.

## Características de localStorage:
* Mayor capacidad de almacenamiento, localStorage puede almacenar entre 5 y 10MB dependiendo del navegador web.
* La información almacenada con localStorage no es enviada al servidor en cada petición.
* No existe una caducidad para localStorage, la información podrá quedar almacenada hasta que se elimine expresamente aunque se cierre el navegador.

## Limitaciones del localStorage
La principal limitación de localStorage es que sólo podemos almacenar pares de datos constituidos por un identificador y un cadena de texto (ni arrays, objetos o floats) .
IFCD0210
3
Por ello si deseamos almacenar diversos datos para cada identificador deberemos realizar nosotros la gestión de la cadena contenedora de los datos.
Por desgracia, las implementaciones actuales solo admiten asignaciones de cadena a cadena, así que hay que serializar y deserializar otras estructuras de datos. Este procedimiento se puede realizar con ** JSON.stringify() ** y ** JSON.parse(). **