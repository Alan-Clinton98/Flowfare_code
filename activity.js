document.addEventListener('DOMContentLoaded', () => {
  const showModalButton = document.getElementById('showModal');
  const modal = document.getElementById('activityModal');
  const closeModalButton = document.querySelector('.close');
  const activityForm = document.getElementById('activityForm');
  const dateInput = document.getElementById('dateInput');
  const activityInput = document.getElementById('activityInput');
  const activitiesList = document.getElementById('activitiesList');

  showModalButton.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }

  activityForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const date = dateInput.value;
    const activity = activityInput.value;
    if (!date || !activity) {
      alert('Please fill in both fields.');
      return;
    }
    addActivity(date, activity);
    modal.style.display = 'none';
    dateInput.value = '';
    activityInput.value = '';
  });

  function addActivity(date, activity) {
    const activities = JSON.parse(localStorage.getItem('activities')) || {};
    if (!activities[date]) {
      activities[date] = [];
    }
    activities[date].push(activity);
    localStorage.setItem('activities', JSON.stringify(activities));
    renderActivities();
  }

  function deleteActivity(date, index) {
    const activities = JSON.parse(localStorage.getItem('activities'));
    if (activities[date]) {
      activities[date].splice(index, 1);
      if (activities[date].length === 0) {
        delete activities[date];
      }
      localStorage.setItem('activities', JSON.stringify(activities));
      renderActivities();
    }
  }

  function renderActivities() {
    const activities = JSON.parse(localStorage.getItem('activities')) || {};
    activitiesList.innerHTML = '';
    Object.keys(activities).forEach(date => {
      const dateDiv = document.createElement('div');
      dateDiv.textContent = `Date: ${date}`;
      activities[date].forEach((activity, index) => {
        const activityDiv = document.createElement('div');
        activityDiv.textContent = activity;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteActivity(date, index);
        activityDiv.appendChild(deleteButton);
        dateDiv.appendChild(activityDiv);
      });
      activitiesList.appendChild(dateDiv);
    });
  }

  renderActivities();
});
