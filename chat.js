// Firebase configuration (replace with your own config)
const firebaseConfig = {
  apiKey: "AIzaSyDPEkRcN1Ar003qmTXDj0fds92wWzvzuZo",
  authDomain: "digga12345-22dea.firebaseapp.com",
  projectId: "digga12345-22dea",
  storageBucket: "digga12345-22dea.appspot.com",
  messagingSenderId: "922491742679",
  appId: "1:922491742679:web:a655d9382637fea1594392",
  measurementId: "G-ZGPBJZEET7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("chat-message");
const sendMessageBtn = document.getElementById("send-message");

// Listen for new messages
db.collection("messages").orderBy("timestamp", "asc").onSnapshot((snapshot) => {
  chatBox.innerHTML = ""; // Clear chat box
  snapshot.forEach((doc) => {
    const message = doc.data().message;
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
  });

  // Scroll to the bottom of the chat
  chatBox.scrollTop = chatBox.scrollHeight;
});

// Send new message
sendMessageBtn.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message) {
    db.collection("messages").add({
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    messageInput.value = ""; // Clear input field
  }
});
