using ToDoApi;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()    
                  .AllowAnyHeader()   
                  .AllowAnyMethod();  
        });
});

builder.Services.AddDbContext<ToDoDbContext>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "ToDoApi", Version = "v1" });
});
var app = builder.Build();

app.UseCors("AllowAll");
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.MapGet("/items",async (ToDoDbContext db)=> {return await db.Items.ToListAsync();});
app.MapPost("/items",async (ToDoDbContext db,Item newItem)=>{
    db.Items.Add(newItem);
    await db.SaveChangesAsync();
    return Results.Created($"/items/{newItem.Id}",newItem);
});
app.MapPut("/items/{id}",async(int id,ToDoDbContext db,Item updateItem)=>{
    var item=await db.Items.FindAsync(id);
    if(item==null){
        return Results.NotFound();
    }
    item.Name=updateItem.Name;
    item.IsComplete=updateItem.IsComplete;
    await db.SaveChangesAsync();
   return Results.Ok(item);

});
app.MapDelete("/items/{id}",async (int id,ToDoDbContext db)=>{
    var item=await db.Items.FindAsync(id);
   if(item==null){
        return Results.NotFound();
    }
     db.Items.Remove(item) ;
     await db.SaveChangesAsync();
     return Results.Ok();
    });
app.Run();

