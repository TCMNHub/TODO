CREATE SCHEMA app_todo;

INSERT INTO app_auth.apps (identifier, name, version)
VALUES ('app.tcmn.todo', 'TODO', '1.0.0');
------------------------------------------------------------------------------

CREATE TABLE app_todo.projects
(
    project_id          UUID PRIMARY KEY     DEFAULT gen_random_uuid(),
    user_id     UUID        NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    name        TEXT        NOT NULL,
    description TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE app_todo.projects
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own projects"
    ON app_todo.projects
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING ((select auth.uid()) = user_id);

CREATE POLICY "Enable insert for users based on user_id"
    ON app_todo.projects
    AS PERMISSIVE
    FOR INSERT
    TO public
    WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Enable update for users based on user_id"
    ON app_todo.projects
    AS PERMISSIVE
    FOR UPDATE
    TO public
    WITH CHECK ((SELECT auth.uid()) = user_id);
------------------------------------------------------------------------------

CREATE TABLE app_todo.statuses
(
    status_id   UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
    name        text    NOT NULL,
    description TEXT    NOT NULL,
    is_complete BOOLEAN NOT NULL,
    user_id     UUID    NOT NULL    REFERENCES auth.users (id) ON DELETE CASCADE,
    UNIQUE (user_id, name)
);

ALTER TABLE app_todo.statuses
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own status"
    ON app_todo.statuses
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING ((select auth.uid()) = user_id);

CREATE POLICY "Enable insert for users based on user_id"
    ON app_todo.statuses
    AS PERMISSIVE
    FOR INSERT
    TO public
    WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Enable update for users based on user_id"
    ON app_todo.statuses
    AS PERMISSIVE
    FOR UPDATE
    TO public
    WITH CHECK ((SELECT auth.uid()) = user_id);
------------------------------------------------------------------------------

CREATE TABLE app_todo.todos
(
    todo_id          UUID PRIMARY KEY     DEFAULT gen_random_uuid(),
    user_id     UUID        NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    project_id  UUID        NOT NULL REFERENCES app_todo.projects (project_id) ON DELETE CASCADE,
    title       TEXT        NOT NULL,
    description TEXT,
    status_id   UUID        NOT NULL REFERENCES app_todo.statuses (status_id) ON DELETE RESTRICT,
    due_date    TIMESTAMPTZ,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE app_todo.todos
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own todos"
    ON app_todo.todos
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING ((select auth.uid()) = user_id);

CREATE POLICY "Enable insert for users based on user_id"
    ON app_todo.todos
    AS PERMISSIVE
    FOR INSERT
    TO public
    WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Enable update for users based on user_id"
    ON app_todo.todos
    AS PERMISSIVE
    FOR UPDATE
    TO public
    WITH CHECK ((SELECT auth.uid()) = user_id);
------------------------------------------------------------------------------

CREATE TABLE app_todo.tags
(
    tag_id     UUID PRIMARY KEY     DEFAULT gen_random_uuid(),
    user_id    UUID        NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    name       TEXT        NOT NULL,
    color      varchar(7),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, name)
);

ALTER TABLE app_todo.tags
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own tags"
    ON app_todo.tags
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING ((select auth.uid()) = user_id);

CREATE POLICY "Enable insert for users based on user_id"
    ON app_todo.tags
    AS PERMISSIVE
    FOR INSERT
    TO public
    WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Enable update for users based on user_id"
    ON app_todo.tags
    AS PERMISSIVE
    FOR UPDATE
    TO public
    WITH CHECK ((SELECT auth.uid()) = user_id);
------------------------------------------------------------------------------

CREATE TABLE app_todo.todo_to_tags
(
    todo_id UUID NOT NULL REFERENCES app_todo.todos (todo_id) ON DELETE CASCADE,
    tag_id  UUID NOT NULL REFERENCES app_todo.tags (tag_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    PRIMARY KEY (todo_id, tag_id)
);

ALTER TABLE app_todo.todo_to_tags
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own todo-tag associations"
    ON app_todo.todo_to_tags
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING ((select auth.uid()) = user_id);

CREATE POLICY "Enable insert for users based on user_id"
    ON app_todo.todo_to_tags
    AS PERMISSIVE
    FOR INSERT
    TO public
    WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Enable update for users based on user_id"
    ON app_todo.todo_to_tags
    AS PERMISSIVE
    FOR UPDATE
    TO public
    WITH CHECK ((SELECT auth.uid()) = user_id);
------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION app_todo.update_updated_at_column()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE
    ON app_todo.projects
    FOR EACH ROW
EXECUTE FUNCTION app_todo.update_updated_at_column();

CREATE TRIGGER update_todos_updated_at
    BEFORE UPDATE
    ON app_todo.todos
    FOR EACH ROW
EXECUTE FUNCTION app_todo.update_updated_at_column();
------------------------------------------------------------------------------

GRANT USAGE ON SCHEMA app_todo TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA app_todo TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA app_todo TO authenticated;
