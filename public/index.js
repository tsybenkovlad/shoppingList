window.addEventListener("load", async (event) => {
    await refresh()


    const btnSave = document.getElementById('btn-save')
    const txtName = document.getElementById('item-name')
    btnSave.addEventListener('click', async event => {
        const add = document.querySelector('#addModal');
        await api.add(txtName.value)
        await refresh()
        const modal = bootstrap.Modal.getInstance(add);
        modal.hide();
    })

    const btnEdit = document.getElementById('btn-save-edit')
    const txtNameEdit = document.querySelector('#item-name-edit')
    const txtIdIEdit = document.querySelector('#item-id-edit')
    btnEdit.addEventListener('click', async event => {
        const edit = document.querySelector('#editModal');
        await api.update(txtIdIEdit.value, txtNameEdit.value)
        await refresh()
        const modal = bootstrap.Modal.getInstance(edit);
        modal.hide()
    })
    const addModal = document.getElementById('addModal')

    addModal.addEventListener('shown.bs.modal', () => {
        txtName.value = ""
        txtName.focus()
        console.log("focus")
    })
});
