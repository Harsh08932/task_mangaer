const taskContainer = document.querySelector('.task__container');
let globalStore = [];
console.log(taskContainer);
const generateNewCard = taskData => ` 

<div class="col-sm-12 col-md-6 col-lg-4">
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success"><i class="fas fa-pen"></i></button>
    <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deletecard.apply(this,arguments)"><i class="fas fa-trash" id=${taskData.id}  onclick="deletecard.apply(this,arguments)"></i></button>
  </div>
  <div class="card-body">
    <img src="${taskData.imageUrl}" class="card-img-top" alt="...">
    <h5 class="card-title mt-3 fw-bold text-primary">${taskData.tasktitle}</h5>
    <p class="card-text">${taskData.taskdescription}</p>
    <a href="#" class="btn btn-primary">${taskData.tasktype}</a>
  </div>
</div>
</div>
`;

const initialCardDdata = () => {
  const getCardData = localStorage.getItem('tasky');

  const { cards } = JSON.parse(getCardData);

  cards.map(cardObject => {
    taskContainer.insertAdjacentHTML('beforeend', generateNewCard(cardObject));
    globalStore.push(cardObject);
  });
};

const deletecard = event => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;
  globalStore = globalStore.filter(cardObject => cardObject.id !== targetID);
  localStorage.setItem('tasky', JSON.stringify({ card: globalStore }));

  if (tagname === 'BUTTON') {
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode
    );
  } else {
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode.parentNode
    );
  }
};

const save = () => {
  const taskData = {
    id: `${Date.now()}`,
    imageUrl: document.getElementById('Imageurl').value,
    tasktitle: document.getElementById('Tasktitle').value,
    tasktype: document.getElementById('Tasktype').value,
    taskdescription: document.getElementById('Taskdescription').value,
  };

  taskContainer.insertAdjacentHTML('beforeend', generateNewCard(taskData));
  globalStore.push(taskData);
  //array of objects
  localStorage.setItem('tasky', JSON.stringify({ car: globalStore }));
};
