
exports.up = function (knex) {
    return knex.schema
      .createTable('projects', tbl => {
          tbl.increments('project_id');
          tbl.text('project_name', 128)
              .unique()
              .notNullable();
          tbl.text('project_description', 128);
          tbl.boolean('project_completed')
              .defaultTo(0);
      })
      .createTable('resources', tbl => {
        tbl.increments('resource_id');
        tbl.text('resource_name',128)
          .unique()
          .notNullable();
        tbl.text(`resource_description`,128)
      })
      .createTable('tasks', tbl => {
          tbl.increments('task_id');
          tbl.text('task_description')
              .notNullable()
          tbl.text('task_notes');
          tbl.boolean('task_completed')
              .defaultTo(0);
          tbl.integer('project_id')
              .unsigned()
              .notNullable()
              .references("project_id")
              .inTable("projects")
              .onDelete("RESTRICT");
      })
      .createTable('project_resources', tbl => {
          tbl.increments('project_resource_id');
          tbl.integer('project_id')
              .unsigned()
              .notNullable()
              .references("project_id")
              .inTable("projects")
              .onDelete("RESTRICT");
          tbl.integer('resource_id')
              .unsigned()
              .notNullable()
              .references("resource_id")
              .inTable("resources")
              .onDelete("RESTRICT");
      })
  };
  
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists('project_resources')
      .dropTableIfExists('tasks')
      .dropTableIfExists('resources')
      .dropTableIfExists('projects')
  };
  