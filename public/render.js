let api = new Api()
async function refresh() {
    let arr = (await api.list()).list
    document.getElementById("items-list").innerHTML = ''
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        let row = `
            <div class="list-group mt-3">
                <div class="main d-flex mx-auto w-75 list-group-item"  data-id="${item.id}">
                    <label class="list-group-item d-flex gap-2 m-2 flex-grow-1">
                        <input class="chk-status form-check-input flex-shrink-0" type="checkbox" value="" ${item.checked ? "checked" : ""}>
                        <span class="name">${item.name}</span>
                    </label>
                    <div class="buttons d-flex">
                        <button class="btn-edit btn btn-lg btn-primary m-2 bi-pencil-square" data-bs-toggle="modal" data-bs-target="#editModal"></button>
                        <button class="btn-delete btn-lg btn-primary m-2 bi-trash3-fill"></button>
                    </div>
                </div>
            </div>`
        document.getElementById("items-list").innerHTML += row
        console.log(arr[i])
    }
    const btnDelete = document.querySelectorAll('.btn-delete')
    for (let i = 0; i < btnDelete.length; i++) {
        btnDelete[i].addEventListener('click', deleteListener)
    }
    const chkStatus = document.querySelectorAll('.chk-status')
    for (let i = 0; i < chkStatus.length; i++) {
        chkStatus[i].addEventListener('change', checkListener)
    }
    const btnEdit = document.querySelectorAll('.btn-edit')
    for (let i = 0; i < btnEdit.length; i++) {
        btnEdit[i].addEventListener('click', editListener)
    }
}
async function deleteListener(event) {
    await api.delete(event.target.parentElement.parentElement.dataset.id)
    await refresh()
    console.log("delete", event.target.parentElement.parentElement.dataset.id)
}
async function checkListener(event) {
    event.target.disabled = true
    await api.check(event.target.parentElement.parentElement.dataset.id, event.target.checked)
    await refresh()
    console.log("check", event.target.parentElement.parentElement.dataset.id, event.target.checked)
}
async function editListener(event) {
    const editInput = document.querySelector('#item-name-edit')
    const idInput = document.querySelector('#item-id-edit')
    idInput.value = event.target.parentElement.parentElement.dataset.id
    editInput.value = event.target.parentElement.parentElement.querySelector('.name').innerText
    editInput.focus()
    editInput.select()
}