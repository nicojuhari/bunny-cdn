export const getFileExtension = (filename) => {
    let ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? "" : ext[1];
};

export const getFileName = (filename) => {
    return filename.replace(/\.[^/.]+$/g, "");
};

export const prepareFileName = (fl) => {
    fl = fl.trim().toLowerCase();
    fl = fl.replace(/[^a-zA-Z0-9]/g, " "); //remove non alf
    fl = fl.replace(/ +/g, " "); //remove multiple spaces
    fl = fl.replace(/ /g, "-"); //space to dash
    fl = fl.replace(/(^[-_]*|[-_]*$)/g, ""); // removes -_ if starts or end

    return fl;
};

export const fileReader = async (file) => {
    let result = await new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result);
        };
        reader.readAsDataURL(file);
    });
    return result;
};
