(() => {
  const toc = document.querySelector('.case-toc')
  if (!toc) return

  const links = [...toc.querySelectorAll('.case-toc-links a[href^="#"]')]
  const sections = links
    .map((link) => {
      const id = link.getAttribute('href').slice(1)
      const el = document.getElementById(id)
      return el ? { id, el, link } : null
    })
    .filter(Boolean)

  if (!sections.length) return

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`)
    })
  }

  const onScroll = () => {
    const marker = window.scrollY + 120
    let current = sections[0].id
    for (const section of sections) {
      if (section.el.offsetTop <= marker) current = section.id
    }
    setActive(current)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1)
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.replaceState(null, '', `#${id}`)
      setActive(id)
    })
  })
})()
