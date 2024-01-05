// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { getStorage, ref as storageRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOJKtNvZd1mZPVI8WxmzNKmYVL06rMVLk",
    authDomain: "sport-in-bucate.firebaseapp.com",
    databaseURL: "https://sport-in-bucate-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sport-in-bucate",
    storageBucket: "sport-in-bucate.appspot.com",
    messagingSenderId: "862207444027",
    appId: "1:862207444027:web:d462c6a7add732a1f2c81e",
    measurementId: "G-8JY4QDM0KQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//get ref to Realtime atabase services
const db = getDatabase(app);

//get ref to Firebase Storage
const storage = getStorage();

//--------------
const hiddenNumber = document.getElementById('postId');
const postId = parseInt(hiddenNumber.value);
const articlesDbRef = ref(db, 'user/' + postId);

let doc = document.querySelector('.main');
const postMethod = (item) => {
      let gsReference = storageRef(storage, item.img);
      // Get the download URL for the image
      getDownloadURL(gsReference)
        .then((url) => {
          const postElement = document.createElement('div');
          postElement.classList.add('main');
          postElement.innerHTML = `
            <div class="img">
              <img src="${url}" alt="Felix Brych">
            </div>
            <div class="text-container">
                <div class="text">
                    <span>${item.inhalt}</span>
                </div>
            </div>
          `;
  
          doc.append(postElement);
        })
        .catch((error) => {
          console.error('Error getting download URL:', error);
        });
    
  };
  const methodNew = () => {
    onValue(articlesDbRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        postMethod(data);
    });
  };
  methodNew();
