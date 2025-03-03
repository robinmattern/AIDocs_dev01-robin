module.exports = {
    apps: [
      {
        name: "AIDocs_Rick-8016",                  
        script: "C:\\Program Files\\WindowsApps\\PythonSoftwareFoundation.Python.3.12_3.12.2544.0_x64__qbz5n2kfra8p0\\python3.12.exe",
        args: "-m http.server 8016",               
        cwd: "E:\\Repos\\Robin\\AIDocs_\\demo1-master\\client1\\c16_aidocs-review-app", 
        autorestart: true,                         
        watch: false,                              
      },
      {
        name: "AIDocs_Rick-8017",                  
        script: "C:\\Program Files\\WindowsApps\\PythonSoftwareFoundation.Python.3.12_3.12.2544.0_x64__qbz5n2kfra8p0\\python3.12.exe",
        args: "-m http.server 8017",               
        cwd: "E:\\Repos\\Robin\\AIDocs_\\demo1-master\\client1\\c17_aidocs-review-app", 
        autorestart: true,                         
        watch: false,                              
      },
      {
        name: "AIDocs_8121",                       
        script: "C:\\Program Files\\WindowsApps\\PythonSoftwareFoundation.Python.3.12_3.12.2544.0_x64__qbz5n2kfra8p0\\python3.12.exe",
        args: "-m http.server 8016",               
        cwd: "E:\\Repos\\Robin\\AIDocs_\\demo1-master\\server2\\s21_first-api", 
        autorestart: true,                         
        watch: false,                              
      }
    ]
  };