const tempElement = document.getElementById("temp");

for (file in modInfo.modFiles) {
    let script = document.createElement("script");
    script.setAttribute("src", "js/" + modInfo.modFiles[file]);
    document.head.insertBefore(script, tempElement);
}

