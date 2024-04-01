
// import   APIfns    from          '../../._3c1/JPTs/getAPI_u1.01.mjs/';           var getAPI = APIfns.getAPI
// import   APIfns    from          '../../._3c1/JPTs/getAPI_v1.01`40324.mjs/';     var getAPI = APIfns.getAPI
// import   JPTfns    from          '../../._3c1/JPTs/getAPI_v1.02`40331.1106.mjs'
// import   JPTfns    from          '../../._3c1/JPTs/getAPI_v1.02`40331.1108.mjs'; var getAPI = JPTfns.getAPI
   import   JPTfns    from          '../../._3c1/JPTs/getAPI_u1.02.mjs';            var getAPI = JPTfns.getAPI

    var console_log = JPTfns.console_log

        console_log("hello"); // process.exit()

    var __APP_DIR      =  JPTfns.appDir( import.meta.url ) // 's31_text-to-sql-apis' or 's31-openai-sql-generator-apis'
    var SERVER_PORT    =  process.env.SERVER_PORT          // .(40320.01.1 RAM ENV vars set in getAPI.mjs with dotenv )
    var ANYLLM_API_KEY =  process.env.ANYLLM_API_KEY
    var OPENAI_API_KEY =  process.env.OPENAI_API_KEY
    var openaiApiKey   =  process.env.OPENAI_API_KEY

    var aTests         =  "16" // "18,1"
    var bCalled        =  JPTfns.isCalled( import.meta.url )       // aCallee
    var aTests         = (process.argv[2] > "") ? process.argv[2] : (bCalled ? "" : aTests)

        console_log( `__APP_DIR: ${__APP_DIR}`, -2 )
        console_log( `SERVER_PORT: ${SERVER_PORT}` )
        console_log( `MY_NAME: ${process.env.MY_NAME}`,-1 )
        console_log( `MY_NAME2: ${process.env.MY_NAME2}` )

//  --------------------------------------------------------------
