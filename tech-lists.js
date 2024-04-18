const techLists = [{label: 'Java'}, {label: 'Android'}, {label: 'Laravel'}, {label: 'React'}, {label: 'Angular'}, {label: 'Node JS'}, {label: 'Java'}, {label: 'Android'}, {label: 'Laravel'}, {label: 'React'}, {label: 'Angular'}, {label: 'Node JS'}];
const techListWrapper = document.getElementById('tech-lists');
let techListTemplate = ''

for(let count = 0; count < techLists.length; count++) {
	techListTemplate+= '<li><span>';
	techListTemplate+= techLists[count].label;
	techListTemplate+= '</span></li>';
}

techListWrapper.style.setProperty("--total", techLists.length); 
techListWrapper.innerHTML = techListTemplate