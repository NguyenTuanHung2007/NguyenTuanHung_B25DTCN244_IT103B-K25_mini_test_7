let contacts = [
  {
    name: "Nguyễn Văn An",
    phone: "0901234567",
    email: "nguyenvanan@email.com",
  },
  {
    name: "Trần Thị Bình",
    phone: "0912345678",
    email: "tranthibinh@email.com",
  },
  { name: "Lê Văn Cường", phone: "0923456789", email: "levancuong@email.com" },
  {
    name: "Phạm Thị Dung",
    phone: "0934567890",
    email: "phamthidung@email.com",
  },
  { name: "Hoàng Văn Em", phone: "0945678901", email: "hoangvanem@email.com" },
];

const form = document.getElementById("contact-form");
const tbody = document.getElementById("contact-tbody");
const nameInput = document.getElementById("contact-name");
const phoneInput = document.getElementById("contact-phone");
const emailInput = document.getElementById("contact-email");

function validateContact(data) {
  if (!data.name || data.name.length < 2 || data.name.length > 50)
    return "Họ tên không hợp lệ!";
  if (!data.phone || !/^0[3|5|7|8|9]\d{8}$/.test(data.phone))
    return "Số điện thoại phải 10 chữ số bắt đầu 0!";
  if (!data.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email))
    return "Email không hợp lệ!";
  return null;
}

function renderTable() {
  tbody.innerHTML = "";
  if (contacts.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="5" class="empty-state"><p>Chưa có liên hệ nào!</p></td></tr>';
    return;
  }
  contacts.forEach((contact, index) => {
    const row = tbody.insertRow();
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${contact.name}</td>
      <td>${contact.phone}</td>
      <td>${contact.email}</td>
      <td>
        <div class="action-buttons">
          <button class="btn-delete" data-id="${index}">Xóa</button>
        </div>
      </td>
    `;
  });
}

function addContact(e) {
  e.preventDefault();
  const data = {
    name: nameInput.value.trim(),
    phone: phoneInput.value.trim(),
    email: emailInput.value.trim(),
  };
  const error = validateContact(data);
  if (error) {
    alert(error);
    return;
  }
  contacts.push(data);
  nameInput.value = phoneInput.value = emailInput.value = "";
  alert("Thêm liên hệ thành công!");
  renderTable();
}

function deleteContact(index) {
  if (confirm(`Bạn có chắc muốn xóa "${contacts[index].name}"?`)) {
    contacts.splice(index, 1);
    renderTable();
  }
}

tbody.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (id === undefined) return;
  if (e.target.classList.contains("btn-delete")) deleteContact(Number(id));
});

form.addEventListener("submit", addContact);
renderTable();
