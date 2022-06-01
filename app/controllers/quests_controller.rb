class QuestsController < ApplicationController

  # GET: /quests
  get "/quests" do
    Quest.all.to_json
  end


  # PATCH: /quests/5
  patch "/quests/:id" do
    redirect "/quests/:id"
  end

  # DELETE: /quests/5/delete
  delete "/quests/:id/delete" do
    redirect "/quests"
  end
end
