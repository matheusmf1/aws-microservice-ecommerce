exports.handler = async function( event ) {

  console.log( "request: ", JSON.stringify( event, undefined, 2 ) );

  switch ( event.httpMethod ) {

    case "GET":
      if ( event.pathParameters !== null ) {
        body = await getProduct( event.pathParameters.id ); //GET product/1
      }
      else {
        body = await getAllProducts(); // GET product
      }

  }

  return {
    statusCode: 200,
    heaaders: { "Content-Type": "text/plain" },
    body: `Opa, ${event.path}`
  }

};