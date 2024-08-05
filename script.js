const files = [
  "document1.txt",
  "presentation1.pdf",
  "song1.mp3",
  "installer1.exe",
  "archive1.rar",
  "report1.docx",
  "image1.jpg",
  "graphic1.png",
  "animation1.gif",
  "compressed1.zip",
  "document2.txt",
  "presentation2.pdf",
  "song2.mp3",
  "installer2.exe",
  "archive2.rar",
  "report2.docx",
  "image2.jpg",
  "graphic2.png",
  "animation2.gif",
  "compressed2.zip",
  null,
  "presentation3.pdf",
  "",
  "installer3.exe",
  "archive3.rar",
  "report3.docx",
  "image3.jpg",
  "graphic3.png",
  "animation3.gif",
  "compressed3.zip",
  "document4.txt",
  "presentation4.pdf",
  "song4.mp3",
  "installer4.exe",
  "archive4.rar",
  "report4.docx",
  "image4.jpg",
  "graphic4.png",
  "animation4.gif",
  "compressed4.zip",
  "document5.txt",
  "presentation5.pdf",
  "song5.mp3",
  "installer5.exe",
  "archive5.rar",
  "report5.docx",
  "image5.jpg",
  "graphic5.png",
  "animation5.gif",
  "compressed5.zip",
  "document6.txt",
  "presentation6.pdf",
  "song6.mp3",
  "installer6.exe",
  "archive6.rar",
  "report6.docx",
  "image6.jpg",
  null,
  "animation6.gif",
  "compressed6.zip",
  "document7.txt",
  "presentation7.pdf",
  "song7.mp3",
  "installer7.exe",
  "archive7.rar",
  "report7.docx",
  "image7.jpg",
  "graphic7.png",
  "animation7.gif",
  "compressed7.zip",
  "document8.txt",
  "presentation8.pdf",
  "song8.mp3",
  "installer8.exe",
  "archive8.rar",
  "report8.docx",
  "image8.jpg",
  "",
  "animation8.gif",
  "compressed8.zip",
  "document9.txt",
  "presentation9.pdf",
  "song9.mp3",
  "installer9.exe",
  "archive9.rar",
  "report9.docx",
  "image9.jpg",
  "",
  "animation9.gif",
  "compressed9.zip",
  "document10.txt",
  "presentation10.pdf",
  "song10.mp3",
  "installer10.exe",
  "archive10.rar",
  "report10.docx",
  "image10.jpg",
  "graphic10.png",
  "animation10.gif",
  "compressed10.zip",
];

const filedata = files
  .filter((file) => file)
  .map((file, index) => {
    const [name, type] = file.split(".");
    return {
      id: index + 1,
      name,
      type: type ? `.${type}` : `unknown`,
    };
  });

const categorizefiles = (files) => {
  const categories = {};
  files.forEach((file) => {
    if (!categories[file.type]) {
      categories[file.type] = [];
    }
    categories[file.type].push(file);
  });
  return categories;
};

const displayfolder = (categories) => {
  const folderdiv = document.getElementById("folders");
  folderdiv.innerHTML = "";
  Object.keys(categories).forEach((type) => {
    const folderdiv2 = document.createElement("div");
    folderdiv2.className = "folder";
    folderdiv2.addEventListener("click", () => displayfiles(categories[type]));
    folderdiv.appendChild(folderdiv2);
  });
};

const displayfiles = (files) => {
  const fileListdiv = document.getElementById("file-list");
  fileListdiv.innerHTML = "";
  files.forEach((file) => {
    const filediv = document.createElement("div");
    filediv.className = "file";
    filediv.textContent = `${file.name} ${file.type}`;
    fileListdiv.appendChild(filediv);
  });
};

const searchfiles = (query, files) => {
  return files.filter((file) => file.name.includes(query));
};
const sortfiles = (files, ascending = true) => {
  return files.sort((a, b) =>
    ascending ? a.name.localCompare(b.name) : b.name.localCompare(a.name)
  );
};
const categories = categorizefiles(filedata);
displayfolder(categories);

document.getElementById("search").addEventListener("input", (e) => {
  const query = e.target.value;
  const folderdiv = document.querySelector(".folder.active");
  if (folderdiv) {
    const foldertype = folderdiv.textContent;
    const filteredfiles = searchfiles(query, categories[foldertype]);
    displayfiles(filteredfiles);
  }
});

document.getElementById("sort-btn").addEventListener("click", () => {
  const folderdiv = document.querySelector(".folder.active");
  if (folderdiv) {
    const foldertype = folderdiv.textContent;
    const sortedfiles = sortedfiles(categories[foldertype], sortAscending);
    displayfiles(sortedfiles);
    sortAscending = !sortAscending;
    document.getElementById("sort-btn").textContent = sortAscending
      ? "sort Ascending"
      : "sort Descending";
  }
});
