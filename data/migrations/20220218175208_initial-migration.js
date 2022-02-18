
exports.up = async function(knex) {
  await knex.schema
  .createTable('projects', tbl =>{
    tbl.increments('project_id')
    tbl.string('project_name', 200).notNullable().unique()
    tbl.string('project_description', 280)
    tbl.boolean('project_completed').notNullable().defaultTo(0)
  })
  .createTable('resources', tbl =>{
    tbl.increments('resource_id')
    tbl.string('resource_name', 200).notNullable().unique()
    tbl.string('resource_description', 280)
  })
  .createTable('tasks', tbl =>{
      tbl.increments('task_id')
      tbl.string('task_description', 280).notNullable()
      tbl.string('task_notes', 280)
      tbl.boolean('task_completed').notNullable().defaultTo(0)
      tbl.integer('project_id')
      .unsigned()
      .notNullable()
      .references('project_id')
      .inTable('projects')
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT')
  })
  .createTable('project_resources', tbl =>{
    tbl.increments('project_resources_id')
    tbl.integer('task_id')
      .unsigned()
      .notNullable()
      .references('task_id')
      .inTable('tasks')
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT')
    tbl.integer('resource_id')
      .unsigned()
      .notNullable()
      .references('resource_id')
      .inTable('resources')
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT')
  })
};

exports.down = async function(knex) {
    await knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
