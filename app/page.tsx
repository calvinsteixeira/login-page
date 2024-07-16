export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-16">
      <div className="w-full">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-left text-primary">Seja bem vindo!</h1>
          <p className="text-muted text-sm">
            Por favor, insira seus dados para{" "}
            <span className="font-bold">logar</span>
          </p>
        </div>
      </div>
    </main>
  );
}
