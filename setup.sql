-- Enable the pgcrypto extension for UUID generation (usually enabled by default in Supabase, but good practice to include)
create extension if not exists "pgcrypto";

-- 1. Create tables

-- Table: decks
create table public.decks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  title text not null,
  source_text text
);

-- Table: flashcards
create table public.flashcards (
  id uuid primary key default gen_random_uuid(),
  deck_id uuid references public.decks(id) on delete cascade,
  front text not null,
  back text not null,
  difficulty text not null,
  created_at timestamptz default now()
);

-- 2. Enable Row Level Security (RLS)

alter table public.decks enable row level security;
alter table public.flashcards enable row level security;

-- 3. Create Policies (MVP: Allow public access)

-- Policies for decks
create policy "Enable read access for all users" on public.decks
  for select using (true);

create policy "Enable insert access for all users" on public.decks
  for insert with check (true);

create policy "Enable update access for all users" on public.decks
  for update using (true);

create policy "Enable delete access for all users" on public.decks
  for delete using (true);

-- Policies for flashcards
create policy "Enable read access for all users" on public.flashcards
  for select using (true);

create policy "Enable insert access for all users" on public.flashcards
  for insert with check (true);

create policy "Enable update access for all users" on public.flashcards
  for update using (true);

create policy "Enable delete access for all users" on public.flashcards
  for delete using (true);

-- 4. Insert Mock Data

do $$
declare
  new_deck_id uuid;
begin
  -- Insert Deck
  insert into public.decks (title, source_text)
  values ('History of Rome', 'Mock data generated for MVP testing.')
  returning id into new_deck_id;

  -- Insert Flashcards linked to the new deck
  insert into public.flashcards (deck_id, front, back, difficulty)
  values
    (new_deck_id, 'Who founded Rome according to legend?', 'Romulus and Remus', 'Easy'),
    (new_deck_id, 'In what year was the Roman Republic established?', '509 BCE', 'Medium'),
    (new_deck_id, 'Who was the first Roman Emperor?', 'Caesar Augustus', 'Easy'),
    (new_deck_id, 'What major engineering feat transported water to Roman cities?', 'Aqueducts', 'Easy'),
    (new_deck_id, 'Which emperor made Christianity the main religion of the Roman Empire?', 'Constantine the Great', 'Medium');
end $$;
