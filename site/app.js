(function () {
  const input = document.getElementById("search-input");
  const count = document.getElementById("result-count");
  const programs = document.querySelectorAll(".program");
  const programsData = window.PROGRAMS || [];

  function reset() {
    count.textContent = "";
    programs.forEach((el) => el.classList.remove("hidden"));
  }

  function renderResults(query) {
    const lower = query.toLowerCase();
    const matches = programsData.filter((p) =>
      p.name.toLowerCase().includes(lower) ||
      p.category.toLowerCase().includes(lower) ||
      p.summary.toLowerCase().includes(lower)
    );

    const matchedIds = new Set(matches.map((p) => p.id));

    count.textContent =
      matches.length === 1
        ? "1 result"
        : matches.length + " results";

    programs.forEach((el) => {
      el.classList.toggle("hidden", !matchedIds.has(el.id));
    });

    const categorySections = document.querySelectorAll(".category-section");
    categorySections.forEach((section) => {
      const visible = section.querySelectorAll(".program:not(.hidden)").length;
      section.style.display = visible ? "" : "none";
    });
  }

  input.addEventListener("input", (event) => {
    const value = event.target.value.trim();
    if (value === "") {
      reset();
    } else {
      renderResults(value);
    }
  });

  input.addEventListener("focus", reset);
})();
