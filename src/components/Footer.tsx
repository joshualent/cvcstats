export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-muted px-4 pb-14 pt-10">
      <p className="text-center text-muted-foreground">
        &copy; {year} hyperfrog
      </p>
    </footer>
  )
}
