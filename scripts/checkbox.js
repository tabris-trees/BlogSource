hexo.extend.tag.register('checkboxgroup', function(args, content) {
  const lines = content.trim().split('\n');

  const checkboxes = lines.map(line => {
    const parts = line.split(',').map(s => s.trim());
    const options = {};

    parts.forEach(part => {
      const [key, val] = part.split(':').map(s => s.trim());
      if (key && val) options[key] = val;
    });

    const name = options.name || 'checkbox';
    const label = options.label || '选项';
    const checked = options.checked === 'true' ? 'checked' : '';

    return `
<label class="checkbox-container">
  <input type="checkbox" name="${name}" ${checked}>
  <span class="checkmark"></span>
  <span class="label-text">${label}</span>
</label>
    `;
  }).join('\n');

  return `<div class="checkbox-group">\n${checkboxes}\n</div>`;
}, { ends: true });
