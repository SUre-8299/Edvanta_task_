// Toggle for navigation
const navToggler = document.getElementById('navToggler');
const navLinks = document.getElementById('navLinks');

navToggler.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Function for live rendering
function update(i) {
    if(i == 0){
        let htmlCode = document.getElementById("htmlCode").value;
        let cssCode = document.getElementById("cssCode").value;
        let javascriptCode = document.getElementById("javascriptCode").value;
        let text = htmlCode + "<style>" + cssCode + "</style>" + "<script>" + javascriptCode + "</script>";
        let iframe = document.getElementById('viewer').contentWindow.document;
        iframe.open();
        iframe.write(text);
        iframe.close();
    } else if(i == 1){
        let htmlCode = document.getElementById("htmlCode").value;
        let updatedHtml = htmlCode.slice(0, -1);  // Remove the last character from htmlCode
        document.getElementById("htmlCode").value = updatedHtml;
    }
}

// Actions for code editor box buttons

// Function to handle the tab key within textareas
function handleTabKey(event) {
    if (event.keyCode === 9) {
        event.preventDefault();
        const start = event.target.selectionStart;
        const end = event.target.selectionEnd;
        event.target.value = event.target.value.substring(0, start) + "\t" + event.target.value.substring(end);
        event.target.selectionStart = event.target.selectionEnd = start + 1;
    }
}

// Function to copy content of selected textarea or all textareas if none are selected
document.getElementById('copyBtn').addEventListener('click', function() {
    let combinedContent = "";

    if (document.getSelection().toString()) { // Check if anything is selected
        combinedContent = document.getSelection().toString();
    } else { // If nothing is selected, copy all textareas
        combinedContent = 
            document.getElementById('htmlCode').value + "\n" +
            document.getElementById('cssCode').value + "\n" +
            document.getElementById('javascriptCode').value;
    }

    const textArea = document.createElement('textarea');
    textArea.value = combinedContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Content copied!');
});

// Function to save content (for the sake of this example, I'll just alert the user)
document.getElementById('saveBtn').addEventListener('click', function() {
    alert('Content saved (not really, but you can implement actual saving, e.g., to a server or local file)');
});

// Function to lock or unlock textareas
document.getElementById('lockBtn').addEventListener('click', function() {
    const lockStatus = this.getAttribute('data-locked');
    const textAreas = document.querySelectorAll('#code-editor-box textarea');
    if (lockStatus === "false") {
        textAreas.forEach(textArea => textArea.setAttribute('readonly', true));
        this.setAttribute('data-locked', 'true');
        this.textContent = 'Unlock';
    } else {
        textAreas.forEach(textArea => textArea.removeAttribute('readonly'));
        this.setAttribute('data-locked', 'false');
        this.textContent = 'Lock';
    }
});

