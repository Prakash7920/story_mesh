const stories = {
  "last-train": {
    title: "The Last Train", genre: "Mystery · Thriller",
    description: "A passenger finds a sealed bag on the final train of the night. The conductor seems to know exactly who it belongs to.",
    choices: [
      {id:"open", title:"Open the bag", desc:"Discover what the passenger was never meant to see."},
      {id:"conductor", title:"Question the conductor", desc:"Find out why he has been watching the bag."}
    ]
  },
  "tomorrow-signal": {
    title: "The Tomorrow Signal", genre: "Sci-fi",
    description: "At 11:59 PM, a radio operator receives a distress call dated tomorrow. The voice sounds exactly like their own.",
    choices: [
      {id:"reply", title:"Reply to the signal", desc:"Risk making contact with the future."},
      {id:"trace", title:"Trace the transmission", desc:"Find the source before midnight."}
    ]
  },
  "monsoon-letters": {
    title: "Monsoon Letters", genre: "Drama",
    description: "After an old house is sold, three letters arrive — each addressed to a different member of the same family.",
    choices: [
      {id:"first", title:"Read the oldest letter", desc:"Uncover a secret from the past."},
      {id:"deliver", title:"Deliver the letters unopened", desc:"Let the family decide what to learn."}
    ]
  }
};

const backdrop = document.getElementById("modalBackdrop");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalEyebrow = document.getElementById("modalEyebrow");
const modalBody = document.getElementById("modalBody");
const modalFeedback = document.getElementById("modalFeedback");
const voteResult = document.getElementById("voteResult");

function openModal(title, description, eyebrow, bodyHTML) {
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modalEyebrow.textContent = eyebrow || "STORYMESH";
  modalBody.innerHTML = bodyHTML;
  modalFeedback.textContent = "";
  backdrop.hidden = false;
  document.body.style.overflow = "hidden";
  const first = modalBody.querySelector("input,textarea,select,button");
  if (first) setTimeout(() => first.focus(), 40);
}
function closeModal() {
  backdrop.hidden = true;
  document.body.style.overflow = "";
}
document.getElementById("modalClose").addEventListener("click", closeModal);
backdrop.addEventListener("click", e => { if (e.target === backdrop) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !backdrop.hidden) closeModal(); });

function storyModal(id) {
  const story = stories[id];
  if (!story) return;
  const choices = story.choices.map((choice, index) =>
    `<button type="button" data-modal-vote="${choice.id}"><strong>${String.fromCharCode(65 + index)} · ${choice.title}</strong><small>${choice.desc}</small></button>`
  ).join("");
  openModal(story.title, story.description, story.genre.toUpperCase(),
    `<div class="modal-story-list">${choices}</div><p>Sample story for the prototype. Your vote is a local demo interaction.</p>`);
  modalBody.querySelectorAll("[data-modal-vote]").forEach(button => {
    button.addEventListener("click", () => {
      const choice = story.choices.find(item => item.id === button.dataset.modalVote);
      modalFeedback.textContent = `Demo vote recorded: “${choice.title}”. In a live product, the community result would appear here.`;
      modalBody.querySelectorAll("[data-modal-vote]").forEach(b => b.disabled = true);
      button.style.borderColor = "#a58bff";
    });
  });
}
document.querySelectorAll("[data-story]").forEach(button => button.addEventListener("click", () => storyModal(button.dataset.story)));
document.getElementById("heroPlay").addEventListener("click", () => storyModal("last-train"));

document.querySelectorAll("[data-vote]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-vote]").forEach(b => b.classList.remove("chosen"));
    button.classList.add("chosen");
    const choice = button.dataset.vote === "open" ? "Open the bag" : "Ask the conductor";
    try {
      const key = "storymesh_demo_vote_last_train";
      localStorage.setItem(key, button.dataset.vote);
    } catch (_) {}
    voteResult.textContent = `Your demo vote: “${choice}”. Thanks for shaping the story!`;
  });
});
document.getElementById("chooseNow").addEventListener("click", () => {
  document.getElementById("choice-demo").scrollIntoView?.({behavior:"smooth"});
  document.querySelector(".choice-demo").scrollIntoView({behavior:"smooth", block:"center"});
  voteResult.textContent = "Choose A or B to cast your demo vote.";
});

document.querySelectorAll(".filter-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("selected"));
    chip.classList.add("selected");
    const filter = chip.dataset.filter;
    document.querySelectorAll(".story-card").forEach(card => {
      card.hidden = filter !== "all" && card.dataset.genre !== filter;
    });
  });
});

function joinModal() {
  openModal("Join the story", "Choose how you want to participate in this early prototype.", "WELCOME TO STORYMESH",
    `<div class="modal-story-list">
      <button type="button" data-join="watch"><strong>▶  I want to watch</strong><small>Discover stories and vote on what happens next.</small></button>
      <button type="button" data-join="create"><strong>✳  I want to contribute</strong><small>Submit scene ideas and collaborate with creators.</small></button>
      <button type="button" data-join="creator"><strong>✎  I want to create stories</strong><small>Develop original stories and invite the community in.</small></button>
    </div>`);
  modalBody.querySelectorAll("[data-join]").forEach(button => button.addEventListener("click", () => {
    const role = button.dataset.join;
    const labels = {watch:"Viewer",create:"Contributor",creator:"Story creator"};
    try { localStorage.setItem("storymesh_demo_role", role); } catch (_) {}
    modalFeedback.textContent = `Demo preference saved: ${labels[role]}. This prototype does not create an account or send your information anywhere.`;
    modalBody.querySelectorAll("button").forEach(b => b.disabled = true);
    button.style.borderColor = "#a58bff";
  }));
}
document.getElementById("joinTop").addEventListener("click", joinModal);
document.getElementById("joinBottom").addEventListener("click", joinModal);
document.getElementById("howBtn").addEventListener("click", () => document.getElementById("how-it-works").scrollIntoView({behavior:"smooth"}));

function contributeModal() {
  openModal("Contribute a scene", "Share a short idea for an original story. This demo keeps the submission in your current browser session only.", "CREATOR STUDIO",
    `<form class="modal-form" id="contributionForm">
      <label>Your display name<input name="name" maxlength="40" required placeholder="e.g. Kavi"></label>
      <label>Choose a story<select name="story"><option>The Last Train</option><option>The Tomorrow Signal</option><option>Monsoon Letters</option></select></label>
      <label>Your scene idea<textarea name="idea" maxlength="500" required placeholder="What should happen next? (max 500 characters)"></textarea></label>
      <button class="button button-primary" type="submit">Preview contribution <span>↗</span></button>
    </form>`);
  document.getElementById("contributionForm").addEventListener("submit", event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name")).trim();
    const story = String(form.get("story"));
    const idea = String(form.get("idea")).trim();
    if (!name || idea.length < 8) {
      modalFeedback.textContent = "Please add your name and a scene idea of at least 8 characters.";
      return;
    }
    try {
      const prior = JSON.parse(sessionStorage.getItem("storymesh_demo_contributions") || "[]");
      prior.push({name, story, idea, createdAt:new Date().toISOString()});
      sessionStorage.setItem("storymesh_demo_contributions", JSON.stringify(prior));
    } catch (_) {}
    modalBody.innerHTML = `<div class="modal-story-list"><button type="button"><strong>${escapeHTML(story)} · by ${escapeHTML(name)}</strong><small>${escapeHTML(idea)}</small></button></div><p>Your idea is saved for this browser session as a demo only. It has not been published or sent to anyone.</p>`;
    modalFeedback.textContent = "Contribution preview created. In a real product, the creator would review it and permissions would be agreed before publication.";
  });
}
document.getElementById("contributeBanner").addEventListener("click", contributeModal);

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
document.getElementById("joinTop").setAttribute("aria-label", "Join StoryMesh");
document.getElementById("joinBottom").setAttribute("aria-label", "Join StoryMesh");
