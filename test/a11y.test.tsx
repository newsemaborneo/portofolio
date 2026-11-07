import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '@/app/page'
import { LanguageProvider } from '@/lib/i18n'

function renderPage() {
  return render(
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  )
}

it('has exactly one h1 and landmarks', () => {
  renderPage()
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  expect(screen.getByRole('main')).toBeInTheDocument()
  expect(screen.getByRole('navigation')).toBeInTheDocument()
})

it('does not ship em dash in rendered text', () => {
  const { container } = renderPage()
  expect(container.textContent).not.toContain('\u2014')
})
