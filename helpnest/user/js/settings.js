document.getElementById("profileImage").addEventListener("change", e => {
  const file = e.target.files[0];

  if (file) {
    document.getElementById("fileName").innerText = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById("profilePreview").innerText = "";
      document.getElementById("profilePreview").style.backgroundImage =
        `url(${reader.result})`;
      document.getElementById("profilePreview").style.backgroundSize = "cover";
      document.getElementById("profilePreview").style.backgroundPosition = "center";
    };
    reader.readAsDataURL(file);
  }
});
