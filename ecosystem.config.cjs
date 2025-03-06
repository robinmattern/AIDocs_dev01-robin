
   var  path      =  require('path');
   var  aRepoDir  =  __dirname;
   var  aLogFmt   = "HH:mm.sss";

module.exports = {
    apps: [
      {
        name: "AIDocs_c01-8001",
        script: "node",
        args: "server.mjs 8001",
        cwd: path.join( aRepoDir, "server" ),
        log_date_format: aLogFmt,
        autorestart: true,
        watch: false
      },
      {
        name: "AIDocs_s01-8101",
        script: "node",
        args: "server.mjs 8101",
        cwd: path.join( aRepoDir, "server" ),
        log_date_format: aLogFmt,
        autorestart: true,
        watch: false,
      },
      {
        name: "AIDocs_c12-8012",
        script: "node",
        args: "server1.mjs 8012",
        cwd: path.join( aRepoDir, "server1" ),
        log_date_format: aLogFmt,
        autorestart: true,
        watch: false
      },
      {
        name: "AIDocs_s12-8112",
        script: "node",
        args: "server1.mjs 8112",
        cwd: path.join( aRepoDir, "server1" ),
        log_date_format: aLogFmt,
        autorestart: true,
        watch: false
      },
      {
        name: "AIDocs_Rick-8016",
        script: "python3",
        args: "-m http.server 8016",
        cwd: path.join( aRepoDir, "client1", "c16_aidocs-review-app" ),
        log_date_format: aLogFmt,
        autorestart: true,
        watch: false
      },
      {
        name: "AIDocs_Claude-8017",
        script: "python3",
        args: "-m http.server 8017",
        cwd: path.join( aRepoDir, "client1", "c17_convert-ai-session-app" ),
        log_date_format: aLogFmt,
        autorestart: true,
        watch: false
      }
    ]
  };