const fs = require('fs');
// Read package.json file
fs.readFile('package.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading package.json:', err);
        return;
    }

    // Parse JSON data
    const packageJson = JSON.parse(data);
    const versionArr = packageJson.version.split('.').map((v)=>parseInt(v))
    const VERSION_SPIN = 3
    if(versionArr[2]<VERSION_SPIN){
        versionArr[2]++
    }else{
        if(versionArr[1]<VERSION_SPIN){
            versionArr[2] = 0
            versionArr[1]++
        }else{
            versionArr[2] = 0
            versionArr[1] = 0
            versionArr[0]++
        }
    }
    console.log(versionArr)


    packageJson.version = versionArr.join(".");

    // Write updated package.json back to file
    fs.writeFile('package.json', JSON.stringify(packageJson, null, 2), (err) => {
        if (err) {
            console.error('Error writing package.json:', err);
            return;
        }
        console.log('Version updated successfully to', versionArr);
    });
});
