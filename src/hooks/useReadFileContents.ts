export const useReadFileContents = () => {
    return async (file: File) =>
        new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const result = reader.result as string;
                const index = result.indexOf("base64");
                //Adding 'base64,' length to contents
                resolve(result.slice(index + 7));
            };
            reader.onerror = function (error) {
                reject(`File ${file.name} couldn't be read (error: ${error.type})`);
            };
        });
};
