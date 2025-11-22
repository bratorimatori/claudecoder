# Project Guidelines for Claude

## Frontend Aesthetics

<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

**Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.

**Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.

**Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.

**Backgrounds**: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

**Avoid generic AI-generated aesthetics:**
- Overused font families (Inter, Roboto, Arial, system fonts) 
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!
</frontend_aesthetics>

## Additional Project Context

## Additional Project Context

### Package Management
- **Always use latest stable versions** of packages (not pre-release, alpha, or beta)
- Check npm/yarn for current stable releases before installation
- Document version numbers in package.json
- Avoid deprecated packages - suggest modern alternatives if found

### Design Consistency
- **Once an aesthetic is selected for a project, maintain it throughout**
- Do not change fonts, color schemes, or design patterns mid-project without explicit approval
- If suggesting design improvements, always ask first: "Would you like me to explore alternative approaches to [specific element]?"
- Document design decisions (fonts, colors, spacing) at project start for reference

### Code Quality Standards
- Write clean, readable code with meaningful variable/function names
- Add comments for complex logic, but let code be self-documenting where possible
- Follow DRY (Don't Repeat Yourself) principles
- Prefer composition over inheritance
- Keep functions small and single-purpose

### Performance Best Practices
- Optimize images before implementation (WebP format where supported)
- Lazy load images and components below the fold
- Minimize bundle size - code split where appropriate
- Avoid unnecessary re-renders in React
- Use CSS transforms for animations (better performance than position changes)

### Accessibility (a11y)
- Semantic HTML always (nav, main, article, section, etc.)
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Minimum contrast ratios (WCAG AA standard)
- Alt text for all images

### Error Handling
- Always implement proper error boundaries in React
- Add try-catch blocks for async operations
- Provide user-friendly error messages
- Log errors appropriately for debugging

### Git & Version Control
- Write clear, descriptive commit messages
- Keep commits atomic (one logical change per commit)
- Branch naming: feature/*, bugfix/*, hotfix/*

### Documentation
- Add README.md with setup instructions
- Document environment variables needed
- Include API endpoint documentation if applicable
- Add inline documentation for complex algorithms

### TypeScript Preferences
- Use TypeScript for better type safety when appropriate
- Define interfaces for data structures
- Avoid 'any' type - use 'unknown' if type is truly unknown

### Component Architecture (React)
- Keep components focused and reusable
- Extract repeated logic into custom hooks
- Use prop drilling sparingly - consider context for deeply nested data
- File structure: group by feature, not by type

### State Management
- Use built-in React state for component-level state
- Consider Context API for app-wide state before reaching for Redux/Zustand
- Keep state as local as possible

### Before Suggesting Major Changes
- **Always ask before**: Switching frameworks, major refactors, changing established patterns
- **Feel free to implement**: Bug fixes, performance optimizations, accessibility improvements
- **Explain tradeoffs**: When suggesting alternatives, outline pros/cons clearly

### Project-Specific Notes
_Add notes here as project develops - database schemas, API patterns, deployment procedures, etc._