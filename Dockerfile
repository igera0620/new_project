FROM ruby:3.1
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
WORKDIR /new_project
COPY Gemfile /new_project/Gemfile
COPY Gemfile.lock /new_project/Gemfile.lock
RUN bundle install
COPY . /new_project
