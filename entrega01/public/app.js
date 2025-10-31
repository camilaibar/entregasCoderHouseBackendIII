[ "generate-output", "mock-output", "store-output" ].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.textContent = "";
});

const formatJSON = (data) =>
  typeof data === "string" ? data : JSON.stringify(data, null, 2);

const request = async (url, options = {}) => {
  const response = await fetch(url, options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || response.statusText);
  }
  return payload;
};

const form = document.getElementById("generate-form");
const generateOutput = document.getElementById("generate-output");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = {
      users: Number(formData.get("users")) || 0,
      pets: Number(formData.get("pets")) || 0,
    };

    try {
      generateOutput.textContent = "Generando...";
      const result = await request("/api/mocks/generateData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      generateOutput.textContent = formatJSON(result);
    } catch (error) {
      generateOutput.textContent = `Error: ${error.message}`;
    }
  });
}

const mockCountInput = document.getElementById("mock-count");
const mockOutput = document.getElementById("mock-output");

document.querySelectorAll("button[data-action]").forEach((button) => {
  button.addEventListener("click", async () => {
    const count = Number(mockCountInput?.value) || 50;
    const endpoint =
      button.dataset.action === "pets"
        ? "/api/mocks/mockingpets"
        : "/api/mocks/mockingusers";
    const url = `${endpoint}?count=${count}`;

    try {
      mockOutput.textContent = `Consultando ${url} ...`;
      const result = await request(url);
      mockOutput.textContent = formatJSON(result);
    } catch (error) {
      mockOutput.textContent = `Error: ${error.message}`;
    }
  });
});

const storeOutput = document.getElementById("store-output");

document.querySelectorAll("button[data-fetch]").forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      storeOutput.textContent = `Consultando ${button.dataset.fetch} ...`;
      const data = await request(button.dataset.fetch);
      storeOutput.textContent = formatJSON(data);
    } catch (error) {
      storeOutput.textContent = `Error: ${error.message}`;
    }
  });
});
