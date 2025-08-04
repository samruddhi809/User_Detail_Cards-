let form = document.querySelector("form");
let username = document.querySelector("#name");
let role = document.querySelector("#role");
let bio = document.querySelector("#bio");
let photo = document.querySelector("#photo");

//The userManager Object : This is a custom object that contains all the logic and data for managing users.

const userManager = {
  users: [],

  init: function () {
    // Load users from localStorage on init
    const saved = localStorage.getItem("users");
    if (saved) {
      this.users = JSON.parse(saved);
    }
    this.renderUi();
    form.addEventListener("submit", this.submitForm.bind(this));
  },

  submitForm: function (e) {
    e.preventDefault();
    this.addUser();
  },

  addUser: function () {
    const user = {
      id: Date.now(),  // Creates a unique ID using timestamp
      username: username.value,
      role: role.value,
      bio: bio.value,
      photo: photo.value,
    };
     this.users.push(user);    // Adds user to array
     this.updateStorage();     // Saves to localStorage
     form.reset();             // Clears the form
     this.renderUi();          // Re-renders the user cards
  },

  renderUi: function () {
    const container = document.querySelector(".users");
    container.innerHTML = "";

    this.users.forEach((user) => {
      const card = document.createElement("div");
      card.className =
        "bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 flex flex-col items-center border border-blue-100 hover:scale-105 transition";

      const img = document.createElement("img");
      img.className =
        "w-28 h-28 rounded-full object-cover mb-5 border-4 border-blue-200 shadow";
      img.src = user.photo;
      img.alt = "User Photo";
      card.appendChild(img);

      const name = document.createElement("h2");
      name.className = "text-2xl font-bold mb-1 text-blue-700";
      name.textContent = user.username;
      card.appendChild(name);

      const role = document.createElement("p");
      role.className = "text-purple-500 mb-2 font-medium";
      role.textContent = user.role;
      card.appendChild(role);

      const desc = document.createElement("p");
      desc.className = "text-gray-700 text-center mb-4";
      desc.textContent = user.bio;
      card.appendChild(desc);

      // ❗ Remove Button
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.className =
        "px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded shadow";
      removeBtn.addEventListener("click", () => this.removeUser(user.id));
      card.appendChild(removeBtn);

      container.appendChild(card);
    });
  },

  removeUser: function (id) {
    this.users = this.users.filter((user) => user.id !== id);
    this.updateStorage();
    this.renderUi();
  },

  updateStorage: function () {
    localStorage.setItem("users", JSON.stringify(this.users)); //Converts the users array into a string.
  },
};

userManager.init();
