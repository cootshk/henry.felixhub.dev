function projectsOnLoad() {
    console.log("projectsOnLoad");
    let template;
    fetch("/api/projects.json").then(response => response.json()).then(data => {
        console.log(data);
    });
    fetch("/html/templates/project.html").then(response => response.text()).then(data => {template = data; console.log(data);});
    console.log(template);

    $('projects-loading').classList.remove("hidden");
}